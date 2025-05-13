interface LoginMsgProps {
  msg: string;
  setLoginMsg: (msg: string | null) => void;
}

const LoginMsg: React.FC<LoginMsgProps> = ({ msg, setLoginMsg }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-5 bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center min-w-[300px] opacity-98">
        <h2 className="text-lg font-semibold mb-4">{msg}</h2>
        <button
          className="hoverColor my-button text-white px-14 py-2 rounded px-4 hover:cursor-pointer"
          onClick={() => setLoginMsg(null)}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default LoginMsg;
