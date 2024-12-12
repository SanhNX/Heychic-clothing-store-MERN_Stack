import React, { useState, useEffect } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

// Array chứa các đường dẫn hình ảnh
const arrayImages = [
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988478/p_img6_dsqhzq.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988478/p_img7_eyw6bn.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988471/p_img5_hwqrux.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988469/p_img3_rze28y.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988468/p_img4_pwvqxe.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988450/p_img34_ofjazi.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988449/p_img33_v67dxr.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988441/p_img52_wulezg.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988440/p_img51_a4zgyf.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988437/p_img44_xylhiw.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988429/p_img41_mfylu3.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988426/p_img23_smcf0g.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988419/p_img18_xmycuk.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988416/p_img16_ggwdis.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988412/p_img12_tbjwzs.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1732348665/p_img2_2_vhean2.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1732338939/p_img2_1_ds72tn.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1732338879/p_img1_pyy6j3.png",
  "https://res.cloudinary.com/dkrutqhij/image/upload/v1733988017/p_img8_svagjr.png",
];

// Function để lấy ngẫu nhiên một hình ảnh
const randomImage = (images, currentImage) => {
  let newImage;
  do {
    const randomIndex = Math.floor(Math.random() * images.length);
    newImage = images[randomIndex];
  } while (newImage === currentImage); // Đảm bảo hình ảnh mới không trùng với hình ảnh hiện tại
  return newImage;
};



const Add = ({token}) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(
    randomImage(arrayImages, "")
  );

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("selectedImage", selectedImage);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleChangeImage = () => {
    setSelectedImage(randomImage(arrayImages, selectedImage));
  };



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div>
          <p className='mb-2'>Thumbnail Image <a className="px-2 bg-blue-500 text-white rounded mt-4 cursor-pointer" onClick={handleChangeImage} > Change Image </a></p>

          <div className='flex gap-2'>
            <label htmlFor="image1">
              <img className='w-20' src={selectedImage} alt="" />
              <input type="hidden" id="selectedImage" name="selectedImage" value={selectedImage} />
              {/*<img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>*/}
            </label>
          </div>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required/>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

            <div>
              <p className='mb-2'>Product category</p>
              <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <p className='mb-2'>Sub category</p>
              <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div>
              <p className='mb-2'>Product Price</p>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
            </div>

        </div>

        <div>
          <p className='mb-2'>Product Sizes</p>
          <div className='flex gap-3'>
            <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter( item => item !== "S") : [...prev,"S"])}>
              <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>S</p>
            </div>
            
            <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter( item => item !== "M") : [...prev,"M"])}>
              <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>M</p>
            </div>

            <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter( item => item !== "L") : [...prev,"L"])}>
              <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>L</p>
            </div>

            <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter( item => item !== "XL") : [...prev,"XL"])}>
              <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XL</p>
            </div>

            <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter( item => item !== "XXL") : [...prev,"XXL"])}>
              <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XXL</p>
            </div>
          </div>
        </div>

        <div className='flex gap-2 mt-2'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
          <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

    </form>
  )
}

export default Add