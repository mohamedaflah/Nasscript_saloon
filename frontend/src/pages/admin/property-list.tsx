import { useAppDispatch, useAppSelector } from "@/redux/store";
// import { Button } from "@/components/ui/button";
import { Button } from "@material-tailwind/react";
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
import { Edit2, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  deleteProperty,
  getPropertyWithUser,
  updateProperty,
} from "@/redux/actions/propertyAction";
import { useNavigate } from "react-router-dom";
export const PropertyList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPropertyWithUser(String("admin")));
  }, [dispatch]);
  const navigate = useNavigate();
  const { properties } = useAppSelector((state) => state.property);

  return (
    <main className="w-full h-full overflow-y-auto">
      <div className="w-full  h-16 flex items-center justify-end">
        <Button
          className="bg-colors-forground "
          onClick={() => navigate("add-property")}
          placeholder={"add"}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add new Service / Product
        </Button>
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
                          type: "status",
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
                <TableCell >  {property?.price} QAR</TableCell>
                <TableCell className="text-right">
                  {format(
                    new Date(property?.createdAt as unknown as string),
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
                    {property?.status}
                  </div>
                </TableCell>
                <TableCell className="text-right capitalize">
                  {property?.listingType}
                </TableCell>

                <TableCell className="text-right">
                  <div className="w-full h-full flex justify-end gap-2 ">
                    <Button
                      placeholder={"Edit"}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      className="px-2  py-1 bg-blue-500"
                      onClick={() => {
                        navigate(`update-property/${String(property?._id)}`);
                      }}
                    >
                      <Edit2 className="w-4" />
                    </Button>
                    <Button
                      placeholder={"delete"}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      className="px-2  py-1 bg-red-500"
                      onClick={() =>
                        dispatch(deleteProperty(String(property?._id)))
                      }
                    >
                      <Trash2 className="w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};
