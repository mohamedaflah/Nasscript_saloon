import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllProperties } from "@/redux/actions/propertyAction";
import { logoutUser } from "@/redux/actions/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  HandCoins,
  LoaderCircle,
  Mail,
  MoveRight,
  PhoneCall,
} from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { isVerified, user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getAllProperties({
        userId: user?._id ? String(user?._id) : "",
        search: searchParam.get("search")
          ? String(searchParam.get("search"))
          : "",
      })
    );
  }, [dispatch, user?._id]);
  const { properties } = useAppSelector((state) => state.property);
  const [searchParam, setSearchParam] = useSearchParams();
  return (
    <main className="w-full h-screen bg-[url(/images/Saloong-bg2.jpg)] bg-cover bg-center pt-0 flex items-end flex-col">
      {/* <Particles/> */}
      <div className="w-full flex relative main px-28 mb-10 py-2 flex-col">
        <div className="h-10 w-full absolute left-0 top-0 bg-black/55 flex justify-end items-start px-20 gap-12">
          <div className="flex items-center gap-1 h-full text-white">
            <PhoneCall className="w-5 text-white" /> +974 944610102
          </div>
          <div className="flex items-center gap-1 h-full text-white">
            <Mail className="w-5 text-white" /> abc@gmail.com
          </div>
          <div className="flex gap-6 items-center h-full">
            <img src={"/images/qtr.svg"} className="h-5" alt="" />
            <img src={"/images/us.svg"} className="h-5" alt="" />
          </div>
        </div>
        <div className="w-full mt-10 flex justify-between items-center">
          <img src={"/images/Nass-logo.png"} className="w-56 " alt="" />
          <div className="flex gap-5 items-center">
            {/* <span className="uppercase font-bold text-white cursor-pointer">Our services</span>
            <span className="uppercase font-bold text-white cursor-pointer">Sell properties</span>
            <span className="uppercase font-bold text-white cursor-pointer">Contact us</span> */}
            {!isVerified ? (
              <>
                <span
                  className="uppercase font-bold text-white cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
                <span
                  className="uppercase font-bold text-white cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </span>
              </>
            ) : (
              <>
                <Link to={'/mybooking'}
                  
                  className={cn(
                    "uppercase font-bold text-white flex gap-2 items-center cursor-pointer px-4 py-2 text-sm bg-black/10 border rounded-lg hover:bg-black/40",
                    {
                      "pointer-events-none": loading,
                    }
                  )}
               
                >
                  My Bookings
                  {loading && (
                    <>
                      <LoaderCircle className="w-5 animate-spin" />
                    </>
                  )}
                </Link>
                <span
                  onClick={() => dispatch(logoutUser())}
                  className={cn(
                    "uppercase font-bold text-white flex gap-2 items-center cursor-pointer px-4 py-2 text-sm bg-black/10 border rounded-lg hover:bg-black/40",
                    {
                      "pointer-events-none": loading,
                    }
                  )}
                >
                  Logout
                  {loading && (
                    <>
                      <LoaderCircle className="w-5 animate-spin" />
                    </>
                  )}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <section className="main grid grid-cols-1 lg:grid-cols-2 ">
        <section className="w-full h-full flex flex-col gap-5   ">
          <div className="w-[70%] flex flex-col gap-5 " data-aos="fade-right">
            <h1
              className="font-bold   text-4xl md:text-[3.5rem] text-white capitalize"
              style={{ lineHeight: "60px" }}
            >
              Book, relax, and glow at your favorite salon
            </h1>
            <div>
              <p className="font-semibold text-white">
                A great platform to book, explore, or manage your salon services
                with no extra fees.
              </p>
            </div>
          </div>
          <div className="w-full relative pr-2" data-aos="fade-right">
            <div className="w-full flex flex-col items-start">
              <div className="min-h-10  min-w-56 rounded-tl-md rounded-tr-md  bg-white/80 flex gap-2 border-b ">
                <div className="w-full text-colors-forground font-semibold h-full border-colors-forground border-b-2 py-3 px-5 flex justify-center">
                  Book
                </div>
                <div className="w-full  font-semibold h-full  py-3 px-5 flex justify-center">
                  Explore
                </div>
                <div className="w-full  font-semibold h-full  py-3 px-5 flex justify-center">
                  Manage
                </div>
              </div>
              <div className="w-full h-20 rounded-md rounded-tl-none p-5 flex bg-white/80 gap-4">
                <div className="w-full h-full border-r  flex-col hidden lg:flex">
                  <h3 className="text-sm">Location</h3>
                  <h1 className="font-semibold ">Doha, Qatar</h1>
                </div>
                <div className="w-full h-full border-r hidden lg:flex flex-col">
                  <h3 className="text-sm">When</h3>
                  <h1 className="font-semibold ">Book Slot</h1>
                </div>
                <div className="w-full h-full flex flex-col">
                  <Button
                    className="h-full bg-colors-forground"
                    // onClick={() => {
                    //   if (isVerified) {
                    //     navigate("/add-property");
                    //   } else {
                    //     toast.error("Please login or register account");
                    //     navigate("/login");
                    //   }
                    // }}
                  >
                    Brows Saloons
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 hidden">
            <div className="flex flex-col gap-3">
              <div className="w-full ">
                <div className="size-16 rounded-full border bg-transparent p-1 relative">
                  <div className="size-full rounded-full bg-transparent border flex-center">
                    <img src="/icons/people.svg" alt="people" />
                  </div>
                  <div className="absolute right-0 bottom-0 size-7 border  bg-black/5 rounded-xl flex-center">
                    <img src="/icons/key.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col">
                <h4 className="font-semibold text-lg text-white">
                  50k+ renters
                </h4>
                <h3 className="text-sm text-white">believe in our service</h3>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-full  ">
                <div className="size-16 relative rounded-full border bg-transparent p-1">
                  <div className="size-full rounded-full bg-transparent border flex-center">
                    <img src="/icons/building.svg" alt="people" />
                  </div>
                  <div className="absolute right-0 bottom-0 size-7 border bg-transparent rounded-xl flex-center">
                    <img src="/icons/lens.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col">
                <h4 className="font-semibold text-lg text-white">
                  50k+ Sellers
                </h4>
                <h3 className="text-sm text-white">believe in our service</h3>
              </div>
            </div>
          </div>
        </section>
        <section
          className="w-full hidden h-full flex items-start bg-[url(/images/house.png)] bg-cover bg-center"
          data-aos="fade-left"
        >
          {/* <img src={"/images/house.png"} className="border" alt="" /> */}
        </section>
      </section>
      <div className="main  h-28 flex-center  mt-3 py-10 hidden">
        <Button
          onClick={() => {
            if (isVerified) {
              navigate("/add-property");
            } else {
              toast.error("Please login or register account");
              navigate("/login");
            }
          }}
          className="h-12 bg-colors-forground hover:bg-colors-forground"
        >
          Sell properties
        </Button>
      </div>
      <section className="main  flex justify-center">
        <main className="w-[90%]">
          <div className="w-full flex-center h-28 flex-col gap-3 mt-36">
            <h1 className="font-bold text-3xl text-black ">Brows Saloons</h1>
            <h3 className="text-sm">Some of our picked properties for you</h3>
          </div>
          <div className="w-full mt-8 min-h-28 flex justify-between items-center flex-col lg:flex-row">
            <div
              className="h-14  w-64 border bg-[#F0EFFB] px-1 rounded-lg flex items-center gap-2"
              style={{ visibility: "hidden" }}
            >
              <Button variant={"outline"} className="h-[84%] w-full">
                Rent
              </Button>
              <Button variant={"outline"} className="h-[84%] w-full">
                Buy
              </Button>
              <Button variant={"outline"} className="h-[84%] w-full">
                Lease
              </Button>
            </div>
            <div className="flex gap-3">
              <div className="h-12 w-64 border rounded-md px-3 bg-[#F7F7FD] flex items-center">
                <img src="/icons/lens2.svg" className="w-5" alt="" />
                <input
                  type="text"
                  onChange={({ target }) => {
                    const param = new URLSearchParams(searchParam.toString());
                    param.set("search", target.value);
                    setSearchParam(param);
                  }}
                  className="w-full h-full text-sm outline-none border-none bg-transparent px-2"
                  placeholder="Search.."
                />
              </div>
              <Button
                className="h-12 bg-colors-forground"
                onClick={() => {
                  dispatch(
                    getAllProperties({
                      userId: user?._id ? String(user?._id) : "",
                      search: searchParam.get("search")
                        ? String(searchParam.get("search"))
                        : "",
                    })
                  );
                }}
              >
                Search
              </Button>
            </div>
          </div>
          <section
            /*data-aos="fade-up"*/ className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-4 "
          >
            {properties && properties?.length <= 0 && (
              <div className="w-full h-28 flex-center">
                <h1 className="font-semibold text-lg">No result found</h1>
              </div>
            )}
            {properties?.map((property, Id) => (
              <div
                data-aos="fade-top"
                data-aos-delay={Id * 50} // Example: delay each item by 100ms more than the previous one
                data-aos-duration="900"
                key={String(property?._id + "" + Id)}
                className="w-full min-h-96 flex flex-col rounded-lg cursor-pointer border overflow-hidden border-[#F0EFFB]"
              >
                <div>
                  <img
                    src={String(property?.images?.[0])}
                    className="h-56 object-cover w-full"
                    alt=""
                  />
                </div>
                <div className="w-full h-full p-4">
                  <div className="w-full flex justify-between">
                    <div className="flex items-center gap-1 ">
                      <h2 className="font-bold text-colors-forground text-2xl">
                        QAR {property?.price}
                      </h2>
                      <span className="text-colors-text text-sm"></span>
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="flex items-center gap-1 ">
                      <h1 className="font-semibold text-2xl">
                        {property.title}
                      </h1>
                    </div>
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="flex items-center gap-1 line-clamp-1">
                      <h4 className="text-colors-text line-clamp-1">
                        {property.description}
                      </h4>
                    </div>
                  </div>
                  <div className="border-t mt-3 pt-2 flex gap-3 justify-between">
                    <div className="flex capitalize font-semibold gap-1 items-center">
                      <HandCoins className="w-5" />
                      {property.listingType}
                    </div>
                  </div>
                  <div
                    className="mt-3 w-full"
                    onClick={() => {
                      navigate(`/property/${String(property?._id)}`);
                    }}
                  >
                    <Button className="h-10 w-full bg-colors-forground gap-2">
                      Go to Details <MoveRight />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>
      </section>
    </main>
  );
};

export default Home;
