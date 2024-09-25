import { Menu, PanelRightOpen } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <main className="w-full scrollbar-none flex h-screen overflow-hidden relative">
      <Menu className="md:hidden absolute left-5 top-7"/>
      <aside className="h-full border-r w-56 py-2 hidden md:block">
        <div className="w-full h-14 flex items-center border-b px-2 justify-between">
          <h2 className="text-colors-forground font-semibold">Menu</h2>
          <PanelRightOpen className="w-5" />
        </div>
        <div className="w-full flex flex-col gap-4 px-3 py-4">
          <Link
            to={"/admin/"}
            className="h-10 text-sm font-semibold shadow-md flex items-center w-full border px-2 rounded-md"
          >
            Saloons
          </Link>
          <Link
            to={"users"}
            className="h-10 text-sm font-semibold shadow-md flex items-center w-full border px-2 rounded-md"
          >
            Users
          </Link>
          <Link
            to={"bookings"}
            className="h-10 text-sm font-semibold shadow-md flex items-center w-full border px-2 rounded-md"
          >
            Bookings
          </Link>
          <Link
            to={"chats"}
            className="h-10 text-sm font-semibold shadow-md flex items-center w-full border px-2 rounded-md"
          >
            Chats
          </Link>
        </div>
      </aside>
      <section className="flex-1 h-full py-4 px-12 overflow-y-auto scrollbar-none">
        <Outlet />
      </section>
    </main>
  );
};
