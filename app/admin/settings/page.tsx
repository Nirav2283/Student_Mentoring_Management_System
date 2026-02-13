import { getSessionUser } from '@/app/lib/auth';
import AdminProfileSetting from '@/app/actions/AdminProfileSetting';

const Adminsettings = async () => {
  const sessionUser = await getSessionUser();

  const initialData = {
    name: sessionUser?.Name ?? "",
    email: sessionUser?.Email ?? "",
  };

  return <AdminProfileSetting initialData={initialData} />;
};

export default Adminsettings;
