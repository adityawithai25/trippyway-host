import { SignInForm } from "../_components/sign-in-form";
import { AuthToggle } from "../_components/auth-toggle";
import RightPanel from "../_components/right-panel";

export default async function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center sm:bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-7xl rounded-2xl overflow-hidden sm:shadow-sm bg-white dark:bg-gray-900">
        <div className="grid md:grid-cols-2 min-h-[700px]">
          <div className="bg-white dark:bg-gray-900 p-8 md:p12 flex flex-col justify-between">
            <div className="flex-1 flex flex-col justify-center max-sm:mt-24">
              <SignInForm />

              <div className="mt-6 text-center">
                <AuthToggle isSignUp={false} />
              </div>
            </div>

            <div className="mt-8 text-xs text-gray-500 dark:text-gray-400 text-center">
              By continuing, you agree to our{" "}
              <a
                href="/terms-condition"
                className="underline hover:text-gray-700 dark:hover:text-gray-300"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                className="underline hover:text-gray-700 dark:hover:text-gray-300"
              >
                Privacy Policy
              </a>
            </div>

            <div className="mt-4 text-xs text-gray-400 dark:text-gray-500 text-center">
              © 2025 TrippyWay
            </div>
          </div>

          <RightPanel className="max-sm:hidden" />
        </div>
      </div>
    </div>
  );
}
