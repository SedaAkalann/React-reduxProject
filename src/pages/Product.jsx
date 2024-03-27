import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { createDataFunc, updateDataItem } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useLocation, useNavigate } from "react-router-dom";
const Product = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { modal } = useSelector((state) => state.modal);
  const { data, newData } = useSelector((state) => state.data);
  const loc = location?.search.split("=")[1];
  const navigate = useNavigate();

  // console.log(location);

  const btnFunc = () => {
    dispatch(
      createDataFunc({
        ...productInfo,
        id: data.length + 1,
      })
    );
    dispatch(modalFunc());
  };
  const btnUpdateFunc = () => {
    dispatch(updateDataItem({ ...productInfo, id: loc }));
    dispatch(modalFunc());
    navigate("/");
  };
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "",
  });
  const onChangeFunc = (e, type) => {
    if (type == "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };
  useEffect(() => {
    if (loc) {
      setProductInfo(data.find((item) => item.id == loc));
    }
  }, [loc]);
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(newData)
  );
  const contentModel = (
    <>
      <Input
        // value={productInfo.name}
        type={"text"}
        placeholder={"ürün ekle"}
        name={"name"}
        id={"name"}
        onChange={(e) => onChangeFunc(e, "name")}
      />
      <Input
        // value={productInfo.price}
        type={"text"}
        placeholder={"fiyat ekle"}
        name={"price"}
        id={"price"}
        onChange={(e) => onChangeFunc(e, "price")}
      />
      <Input
        type={"file"}
        placeholder={"Resim seç"}
        name={"url"}
        id={"url"}
        onChange={(e) => onChangeFunc(e, "url")}
      />
      <Button
        onClick={loc ? btnUpdateFunc : btnFunc}
        btnText={loc ? "Ürün Güncelle" : "Ürün oluştur"}
      />
    </>
  );
  return (
    <div>
      <div className="flex items-center flex-wrap">
        {filteredData?.map((dt, i) => {
          return <ProductCard key={i} dt={dt} />;
        })}
      </div>

      {modal && (
        <Modal
          title={loc ? "Ürün Güncelle" : "Ürün oluştur"}
          content={contentModel}
        />
      )}
    </div>
  );
};

export default Product;
