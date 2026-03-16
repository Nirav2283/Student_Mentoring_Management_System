'use server'

import { z } from 'zod';
import { prisma } from '@/app/lib/prisma';
import { getSessionUser } from '@/app/lib/auth';
import { revalidatePath } from 'next/cache';

const UpdateProfileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
});

export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        _form?: string[];
    };
    message: string;
    success: boolean;
};

export async function updateAdminProfile(prevState: State, formData: FormData) {
    const validatedFields = UpdateProfileSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Profile.',
            success: false
        };
    }

    const { name, email } = validatedFields.data;
    const user = await getSessionUser();

    if (!user) {
        return {
            message: 'Unauthorized.',
            success: false
        };
    }

    try {
        await prisma.users.update({
            where: {
                UserID: user.UserID,
            },
            data: {
                Name: name,
                Email: email,
            },
        });

        revalidatePath('/admin/settings');
        revalidatePath('/admin/dashboard'); // In case name is shown there
        return {
            message: 'Profile updated successfully.',
            success: true
        };
    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Failed to Update Profile.',
            success: false
        };
    }
}
