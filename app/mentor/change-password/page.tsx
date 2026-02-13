import { getSessionUser } from "@/app/lib/auth";
import ChangePasswordClient from "@/app/actions/ChangePasswordClient";

const ChangePasswordPage = async () => {
  const sessionUser = await getSessionUser();

  const userEmail = sessionUser?.Email ?? "";

  return <ChangePasswordClient email={userEmail} />;
};

export default ChangePasswordPage;
