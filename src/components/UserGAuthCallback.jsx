import React, { useEffect, useState } from "react";
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../axios";
import { useDispatch } from "react-redux";

export default function UserGAuthCallback() {
  const [isLoading,setIslLoading]=useState(false)
  console.log("UserGAuth");
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      setIslLoading(true)
      const token = searchParams.get("token");
      console.log("data: " + token);
      const { data } = await axios.get("/auth/verify?token=" + token);
      console.log("data: " + data);
      if (!data.err) {
        console.log("no error");
        dispatch({ type: "refresh" });
        navigate("/");
        setIslLoading(false)
      }
      navigate("/login");
    })();
  }, []);
  return (
    <>{
      isLoading &&
      <div className="d-flex justify-content-center align-items-center ">
        <div class="spinner-border" role="status">
        </div>
      </div>
      }
    </>

    // <Backdrop
    //     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //     open={true}
    //   >
    //     <CircularProgress color="inherit" />
    //   </Backdrop>
  );
}
