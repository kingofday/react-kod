import CustomIcon from "modules/Shared/Components/CustomIcon";
import { ArrowLeft, ArrowRight } from "react-feather";

export interface Props {
  page: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}

const Pagination = ({
    page,
    totalPages,
    handlePagination,
}: Props) => {
    const getPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (page <= 4) {
                pageNumbers.push(1, 2, 3, 4, 5, "separator", totalPages);
            } else if (page > 4 && page < totalPages - 3) {
                pageNumbers.push(1, "separator", page - 1, page, page + 1, "separator", totalPages);
            } else {
                pageNumbers.push(1, "separator", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            }
        }
        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="pagination">
            {totalPages ? (
                <div className="paginationWrapper">
                    {page !== 1 && (
                        <span
                            onClick={() => handlePagination(page - 1)}
                            className="pageItem sides"
                        >
                            <CustomIcon size={15} icon={ArrowLeft} />
                        </span>
                    )}
                    {pageNumbers.map((pageNumber, index) => {
                        if (pageNumber === "separator") {
                            return (
                                <div key={index} className="separator">
                                    ...
                                </div>
                            );
                        }
                        return (
                            <span
                                key={index}
                                onClick={() => handlePagination(parseFloat(pageNumber.toString()))}
                                className={`pageItem ${page === pageNumber && "active"}`}
                            >
                                {pageNumber}
                            </span>
                        );
                    })}
                    {page !== totalPages && (
                        <span
                            onClick={() => handlePagination(page + 1)}
                            className="pageItem sides"
                        >
                            <CustomIcon size={15} icon={ArrowRight} />
                        </span>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default Pagination;
