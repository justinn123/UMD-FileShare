// components/AuthLayout.tsx
type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkText,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">{subtitle}</p>

        {children}

        <p className="text-sm text-gray-500 dark:text-gray-200 mt-4 text-center">
          {footerText}{" "}
          <a href={footerLink} className="underline text-gray-700 dark:text-gray-400">
            {footerLinkText}
          </a>
        </p>
      </div>
    </div>
  );
}
