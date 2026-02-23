'use client'

import { useUpdateParams } from "../hooks/useUpdateParams";

const Pagination = ({ totalPages, currentPage }: { totalPages: number, currentPage: number }) => {
  const updateParams = useUpdateParams();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const setCurrentPage = (page: number) => {
    updateParams({ page: page.toString() });
  }

  return (
    <div className='my-4 flex items-center justify-center'>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3.5 py-1.5 text-sm font-jost mx-1 ${currentPage === page ? 'bg-black text-white' : 'bg-gray-200'}`}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default Pagination