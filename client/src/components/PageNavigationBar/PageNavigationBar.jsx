import React, { useState } from "react";
import PageButton from "./PageButton";
import "./PageNavigationBar.css";

function PageNavigationBar({ max, limit, handlePageChange }) {
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(true);
  const [range, setRange] = useState({
    start: 1,
    end: limit,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = (e) => {
    // handle the prev button case when the start is 1
    if (range.start === 1) {
      setPrevEnabled(false);
      return;
    }

    // set the new range of the buttons
    setRange({
      start: range.start - 1,
      end: range.end - 1,
    });
    // set the next button enabled
    setNextEnabled(true);
  };

  const handleNext = (e) => {
    // handle the next button case when the end is the max
    if (range.end === max) {
      setNextEnabled(false);
      return;
    }

    // set the new range of the buttons
    setRange({
      start: range.start + 1,
      end: range.end + 1,
    });

    // set the prev button enabled
    setPrevEnabled(true);
  };

  return (
    <div className="pg-nav-bar">
      {prevEnabled && (
        <button className="prev" onClick={handlePrev}>
          &lt; Prev
        </button>
      )}

      {Array.from(
        { length: range.end - range.start + 1 },
        (_, i) => range.start + i
      ).map((index) => {
        return (
          <PageButton
            index={index}
            handlePageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
            isActive={index === currentPage}
            key={index}
          />
        );
      })}

      {nextEnabled && (
        <button className="next" onClick={handleNext}>
          Next &gt;
        </button>
      )}
    </div>
  );
}

export default PageNavigationBar;
