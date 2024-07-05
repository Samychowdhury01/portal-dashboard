

const SubmitBtn = ({isLoading}) => {
    return (
        <button className="btn btn-primary text-white w-full lg:w-1/6  lg:mx-auto">
          {isLoading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            "Submit"
          )}
        </button>
    );
};

export default SubmitBtn;