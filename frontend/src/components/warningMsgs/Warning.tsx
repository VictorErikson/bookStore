import { useBookInfo } from "../../contexts/bookInfoContext";

interface WarningProps {
  msg: string;
  setWarningMsg: (msg: string | null) => void;
}

const Warning: React.FC<WarningProps> = ({ msg, setWarningMsg }) => {
  const { setBookInfoId } = useBookInfo();

  setBookInfoId(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center min-w-[300px] opacity-98">
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
