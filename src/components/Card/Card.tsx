import CatPic from '../../assets/cat-2.jfif';
import type { SchemaStore } from '../../features/formData/formDataSlice';

interface CardProps {
  title: string;
  data: SchemaStore | null;
}

export default function Card({ title, data }: CardProps) {
  return (
    <div className="flex h-full min-w-xs flex-col gap-3 rounded-2xl border border-pink-700 p-10">
      {data ? (
        <>
          <h2 className="text-lg font-bold text-pink-700 uppercase">{title}</h2>
          <div className="flex w-full items-center justify-center">
            {data.picture && (
              <img
                src={data.picture}
                alt="Uploaded"
                className="h-32 w-32 rounded-full"
              />
            )}
          </div>
          <div className="flex justify-between text-pink-700">
            <p className="font-bold">Name:</p>
            <p>{data.name}</p>
          </div>
          <div className="flex justify-between text-pink-700">
            <p className="font-bold">Age:</p>
            <p>{data.age}</p>
          </div>
          <div className="flex justify-between text-pink-700">
            <p className="font-bold">Email:</p>
            <p>{data.email}</p>
          </div>
          <div className="flex justify-between text-pink-700">
            <p className="font-bold">Gender:</p>
            <p>{data.gender}</p>
          </div>
          <div className="flex justify-between text-pink-700">
            <p className="font-bold">Country:</p>
            <p>{data.country}</p>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <img
            src={CatPic}
            alt="Cat"
            className="max-h-60 max-w-60 rounded-2xl"
          />
        </div>
      )}
    </div>
  );
}
