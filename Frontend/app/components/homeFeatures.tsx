type FeaturesProps = {
  home: boolean;
  title: string;
  description: string;
};

export default function HomeFeatures({ home, title, description }: FeaturesProps) {
  return (
    <div className={`p-6 rounded-xl shadow bg-white ${home ? `border border-gray-300 dark:border-gray-700 dark:bg-gray-900` : `dark:bg-gray-800 hover:shadow-xl hover:scale-[1.02] hover:rotate-1 transition-all duration-300 ease-out cursor-pointer`}`}>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}