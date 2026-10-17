"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Send } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { toast } from 'sonner';
import { trackedFetch } from "@/app/lib/trackedFetch";

export default function FeedbackFormClient({ sessionId }: { sessionId: number }) {
  const [rating, setRating] = useState(4);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const starLevels = [
    { label: 'POOR', value: 1 },
    { label: 'FAIR', value: 2 },
    { label: 'GOOD', value: 3 },
    { label: 'VERY GOOD', value: 4 },
    { label: 'EXCELLENT', value: 5 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await trackedFetch('/api/student/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, rating, comments }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      toast.success('Feedback submitted successfully!');
      router.push(`/student/mentoringhistory/${sessionId}`);
      router.refresh();
    } catch (err: any) {
      console.error(err);
      const errMsg = err.message || 'An unexpected error occurred.';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Rating */}
          <section className="space-y-6">
            <div className="space-y-1">
              <label className="text-foreground text-lg font-black tracking-tight">Overall Satisfaction</label>
              <p className="text-sm text-muted-foreground font-medium">How would you rate the overall quality of this session?</p>
            </div>

            <div className="flex flex-wrap gap-4">
              {starLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setRating(level.value)}
                  className="group flex flex-col items-center gap-2"
                >
                  <Star
                    className={`size-9 transition-all ${
                      rating >= level.value ? 'text-primary fill-primary' : 'text-muted-foreground/30 group-hover:text-muted-foreground/50'
                    }`}
                  />
                  <span className={`text-[9px] font-black tracking-tighter uppercase ${
                    rating >= level.value ? 'text-primary' : 'text-muted-foreground/50'
                  }`}>
                    {level.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <div className="h-px bg-border w-full" />

          {/* Text Area */}
          <section className="space-y-4">
            <div className="space-y-1">
              <label className="text-foreground text-lg font-black tracking-tight">Comments & Suggestions</label>
              <p className="text-sm text-muted-foreground font-medium">Share your thoughts on what went well or what could be improved.</p>
            </div>
            <Textarea
              placeholder="The methodology discussion was very clear, though I would like more time on Chapter 3 next time..."
              rows={5}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              required
            />
          </section>

          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-6 pt-6 border-t border-border">
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              <span>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</span>
              <Send className="size-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
