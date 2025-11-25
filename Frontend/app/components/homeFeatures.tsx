type FeaturesProps = {
  title: string;
  description: string;
};

export default function HomeFeatures({ title, description }: FeaturesProps) {
  return (
    <div className="p-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow">
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}