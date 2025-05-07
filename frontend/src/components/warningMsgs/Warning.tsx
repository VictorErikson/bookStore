import { colors } from "../../config/colors";

interface WarningProps {
  msg: string;
  setWarningMsg: (msg: null) => void;
}

const Warning: React.FC<WarningProps> = ({ msg, setWarningMsg }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4">{msg}</h2>
        <button
          className="hoverColor my-button text-white px-14 py-2 rounded px-4 hover:cursor-pointer"
          onClick={() => setWarningMsg(null)}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Warning;
