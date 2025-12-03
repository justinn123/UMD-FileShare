import type { FileItem } from "~/types/course";

export default function FilesSection({ files }: { files: FileItem[] }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Uploaded Files</h3>
      {files.length > 0 ? (
        <ul className="list-disc pl-6 space-y-1">
          {files.map((file) => (
            <li key={file._id}>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {file.filename}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No files uploaded yet.</p>
      )}
    </div>
  );
}
