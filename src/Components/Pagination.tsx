import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

type TPagination = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};

export const Pagination = ({ page, setPage, totalPages }: TPagination) => {
  return (
    <div className="join w-full justify-center gap-5">
      <button
        className="join-item btn btn-outline btn-accent"
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        disabled={page === 0}
      >
        <CircleArrowLeft size={20} />
      </button>
      <button className="join-item btn border-accent cursor-auto rounded">
        Page {page}
      </button>
      <button
        className="join-item btn btn-outline btn-accent"
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page + 1 >= totalPages}
      >
        <CircleArrowRight size={20} />
      </button>
    </div>
  );
};
