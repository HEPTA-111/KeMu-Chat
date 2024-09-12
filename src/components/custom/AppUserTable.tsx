import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import KemuUser from "@/app/interfaces/KemuUser";
import { EllipsisVertical } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import KemuUserRole from "@/app/interfaces/KemuUserRoles";
interface Props {
  KemuUsers: KemuUser[];
  KemuUserRoles: KemuUserRole[];
  userBlock: (user: KemuUser) => void;
}

const AppUserTable = ({ KemuUsers, userBlock, KemuUserRoles }: Props) => {
  return (
    <>
      <Table>
        <TableCaption>A list of All Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Count</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>School ID</TableHead>
            <TableHead className="text-right w-[50px]">
              <EllipsisVertical className="size-5 " />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {KemuUsers.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                {KemuUserRoles.find((role) => role.id === user.uid)?.userRole}
              </TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>{user.schoolId}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <EllipsisVertical className="size-5" />
                  </PopoverTrigger>
                  <PopoverContent className="max-w-40 mr-6">
                    <Button
                      variant="ghost"
                      className="w-full text-red-600 font-semibold"
                      onClick={() => userBlock(user)}
                    >
                      Block
                    </Button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AppUserTable;
