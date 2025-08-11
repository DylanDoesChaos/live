import classNames from "@/utils/classNames";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Input({ name, className, type, ...props }: InputProps) {
  return (
    <div className="rounded-md bg-white px-3 pt-2.5 pb-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-sky-600 dark:bg-white/5 dark:outline-white/10 dark:focus-within:outline-sky-500">
      <label
        htmlFor={name}
        className="block text-xs font-medium text-gray-900 dark:text-gray-200"
      >
        {name}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        className={classNames(
          "block w-full text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500",
          className
        )}
        {...props}
      />
    </div>
  );
}
