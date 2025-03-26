import React from "react";
import "./Pagination.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="wrapper-pagination">
            <button
                className="button-pagination"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <svg width="50%" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.124 8.42C5.308 8.42 5.484 8.364 5.652 8.252C5.82 8.148 5.96 8.012 6.072 7.844C6.176 7.676 6.228 7.508 6.228 7.34C6.228 7.148 6.148 6.944 5.988 6.728C5.828 6.512 5.64 6.3 5.424 6.092C5.2 5.876 5.004 5.692 4.836 5.54H9.792C10.248 5.54 10.572 5.504 10.764 5.432C10.956 5.36 11.108 5.24 11.22 5.072C11.332 4.912 11.388 4.688 11.388 4.4C11.388 4.112 11.336 3.888 11.232 3.728C11.12 3.568 10.968 3.448 10.776 3.368C10.584 3.296 10.256 3.26 9.792 3.26H4.836L5.424 2.696C5.752 2.376 5.968 2.132 6.072 1.964C6.176 1.788 6.228 1.62 6.228 1.46C6.228 1.292 6.176 1.124 6.072 0.956C5.968 0.788 5.832 0.651999 5.664 0.547999C5.488 0.435999 5.308 0.379999 5.124 0.379999C4.964 0.379999 4.792 0.431999 4.608 0.536C4.424 0.632 4.208 0.8 3.96 1.04L0.503999 4.4L3.888 7.688C4.176 7.96 4.412 8.148 4.596 8.252C4.78 8.364 4.956 8.42 5.124 8.42Z" fill="#51294B"/>
                </svg>

            </button>

            {getPageNumbers().map((page, index) =>
                page === "..." ? (
                    <span key={index} className="ellipsis-pagination">...</span>
                ) : (
                    <button
                        key={index}
                        className={`button-pagination ${currentPage === page ? "active" : ""}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                className="button-pagination"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <svg width="50%" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.876 8.42C6.692 8.42 6.516 8.364 6.348 8.252C6.18 8.148 6.04 8.012 5.928 7.844C5.824 7.676 5.772 7.508 5.772 7.34C5.772 7.148 5.852 6.944 6.012 6.728C6.172 6.512 6.36 6.3 6.576 6.092C6.8 5.876 6.996 5.692 7.164 5.54H2.208C1.752 5.54 1.428 5.504 1.236 5.432C1.044 5.36 0.892 5.24 0.78 5.072C0.668 4.912 0.612 4.688 0.612 4.4C0.612 4.112 0.664 3.888 0.768 3.728C0.88 3.568 1.032 3.448 1.224 3.368C1.416 3.296 1.744 3.26 2.208 3.26H7.164L6.576 2.696C6.248 2.376 6.032 2.132 5.928 1.964C5.824 1.788 5.772 1.62 5.772 1.46C5.772 1.292 5.824 1.124 5.928 0.956C6.032 0.788 6.168 0.651999 6.336 0.547999C6.512 0.435999 6.692 0.379999 6.876 0.379999C7.036 0.379999 7.208 0.431999 7.392 0.536C7.576 0.632 7.792 0.8 8.04 1.04L11.496 4.4L8.112 7.688C7.824 7.96 7.588 8.148 7.404 8.252C7.22 8.364 7.044 8.42 6.876 8.42Z" fill="#51294B"/>
                </svg>

            </button>
        </div>
    );
};

export default Pagination;