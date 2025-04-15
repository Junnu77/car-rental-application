import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/"); 
    }
  };

  return (
    <button
      onClick={handleGoBack}
      className="inline-flex items-center gap-2 p-1 rounded-full border border-gray-200 text-white hover:bg-gray-400 transition-colors shadow-sm"
    >
      <ArrowLeft className="w-4 h-4" />
      
    </button>
  );
};

export default GoBackButton;
