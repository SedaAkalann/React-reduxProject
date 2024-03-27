import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteDataItem } from "../redux/dataSlice";
import Modal from "./Modal";
import { modalFunc } from "../redux/modalSlice";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ dt }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openEdit, setOpenEdit] = useState(false);
  const handleUpdate = () => {
    dispatch(modalFunc());
    setOpenEdit(false);
    navigate(`/?update=${dt?.id}`);
  };
  return (
    <div className="w-[200px] h-[200px] relative m-2 rounded-md">
      <img
        className="w-full rounded-md h-full absolute "
        src={dt?.url}
        alt=""
      />
      <div className="absolute left-0 bottom-0 bg-indigo-600 text-white w-full px-2">
        <div className="text-lg font-semibold"> {dt?.name}</div>
        <div> {dt?.price}$</div>
      </div>
      <div
        onClick={() => setOpenEdit(!openEdit)}
        className="absolute top-0 right-2"
      >
        <BsThreeDots color="white " size={24} />
      </div>
      {openEdit && (
        <div className="bg-black border border-white text-white absolute top-6 p-2 text-sm right-2 rounded-md ">
          <div className="cursor-pointer">
            <div onClick={() => dispatch(deleteDataItem(dt?.id))}>Sil</div>
            <div onClick={handleUpdate}>Güncelle</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
