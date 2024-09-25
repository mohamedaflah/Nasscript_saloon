import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getPropertyWithUser,
  updateProperty,
} from "@/redux/actions/propertyAction";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Edit2, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
export const MyPosts = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (!user?._id) {
      navigate("/");
    }
  }, [navigate, user?._id]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user?._id) {
      dispatch(getPropertyWithUser(String(user?._id)));
    }
  }, [dispatch, user?._id]);
  const { properties } = useAppSelector((state) => state.property);
  return (
    <main className="w-full h-screen">
      <section className="wrapper px-3 py-5">
        <div className="w-full">
          <h1 className="font-semibold text-2xl">My properties</h1>
        </div>
        <div className="mt-5 w-full">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Added at</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Sell type</TableHead>
                <TableHead className="text-right">Property type</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties?.map((property, Id) => (
                <TableRow key={String(Id + "" + property?._id)}>
                  <TableCell className="font-medium">
                    <div className="w-full flex h-full items-center gap-1 line-clamp-1 ">
                      <img
                        src={property?.images?.[0] as string}
                        className="size-10 object-cover rounded-md"
                        alt=""
                      />
                      <span className="line-clamp-1">{property.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value) => {
                        dispatch(
                          updateProperty({
                            propertyId: String(property._id),
                            sendPayload: {
                              ...property,
                              status: value as "publish" | "unpublish",
                            },
                            type: "normal",
                          })
                        );
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="publish">Publish</SelectItem>
                        <SelectItem value="unpublish">Unpublish</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>₹{property?.price}</TableCell>
                  <TableCell className="text-right">
                    {format(
                      new Date(property.createdAt as unknown as string),
                      "PPP"
                    )}
                  </TableCell>
                  <TableCell className="text-right flex justify-end ">
                    <div
                      className={cn(
                        "p-2 border rounded-lg w-20 h-7 text-sm capitalize flex-center text-white",
                        {
                          "bg-green-500": property.status == "publish",
                          "bg-red-500": property.status == "unpublish",
                        }
                      )}
                    >
                      {property.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-right capitalize">
                    {property.listingType}
                  </TableCell>
                  <TableCell className="text-right capitalize">
                    {property.propertyType}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="w-full h-full flex justify-end gap-2 ">
                      <Button
                        className="px-2  py-1 bg-blue-500"
                        onClick={() => {
                          navigate(`/update-property/${String(property?._id)}`);
                        }}
                      >
                        <Edit2 className="w-4" />
                      </Button>
                      <Button className="px-2  py-1 bg-red-500">
                        <Trash2 className="w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
};
