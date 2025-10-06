// components/AuthInput.tsx
type AuthInputProps = {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export default function AuthInput({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: AuthInputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
          ${error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 dark:border-gray-600 focus:ring-gray-400 dark:focus:ring-gray-500"}
          text-gray-900 dark:text-gray-100 bg-transparent caret-black dark:caret-white`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
