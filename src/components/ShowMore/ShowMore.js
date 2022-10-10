import "./ShowMore.css";

function ShowMore({ isMoreButtonVisible, onMoreButtonClick }) {
  return (
    <div className="show-more">
      <button
        className={
          !isMoreButtonVisible
            ? `show-more__button show-more__button_inactive`
            : `show-more__button`
        }
        onClick={onMoreButtonClick}
      >
        Ещё
      </button>
    </div>
  );
}

export default ShowMore;
