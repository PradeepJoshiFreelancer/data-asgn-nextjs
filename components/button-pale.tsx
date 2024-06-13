type Props = {
  onClickHandller: (num: number) => void;
  showPrevButton: boolean;
  showNextButton: boolean;
};

const ButtonPanel = ({
  onClickHandller,
  showPrevButton,
  showNextButton,
}: Props) => {
  return (
    <div className="container flex mx-auto">
      <div className="flex flex-row mx-auto">
        <div className="w-1/2">
          {showPrevButton && (
            <button
              type="button"
              className="bg-green-800 text-white rounded-l-md border-r border-green-100 py-2 hover:bg-green-700 hover:text-white px-3"
              onClick={() => onClickHandller(-1)}
            >
              <div className="flex flex-row align-middle">
                <svg
                  className="w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="ml-2">Prev</p>
              </div>
            </button>
          )}
        </div>
        <div className="w-1/2">
          {showNextButton && (
            <button
              type="button"
              className="bg-blue-800 text-white rounded-r-md py-2 border-l border-blue-200 hover:bg-blue-700 hover:text-white px-3"
              onClick={() => onClickHandller(1)}
            >
              <div className="flex flex-row align-middle">
                <span className="mr-2">Next</span>
                <svg
                  className="w-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ButtonPanel;
