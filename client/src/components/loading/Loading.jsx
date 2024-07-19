import './Loading.scss'
import { Puff } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loading-container">
      <Puff
            height="20"
            width="20"
            color="#ffffff"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>
  );
};

export default Loading;
