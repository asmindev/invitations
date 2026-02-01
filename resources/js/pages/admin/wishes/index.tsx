import AdminLayout from "@/layouts/admin-layout";
import { Head, router } from "@inertiajs/react";
import { Wish, Paginated, PageProps } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Loader2, MessageCircle, Search, Trash } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

interface Props extends PageProps {
    wishes: Paginated<Wish>;
    filters: { search?: string };
}

export default function WishesIndex({ wishes, filters }: Props) {
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route("admin.wishes.index"),
            { search },
            { preserveState: true }
        );
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Wishes & Messages
                </h2>
            }
        >
            <Head title="Wishes & Messages" />

            {/* Stats Card */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Wishes
                        </CardTitle>
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{wishes.total}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Table Card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Wishes</CardTitle>
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center gap-2"
                    >
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search wishes..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-8 w-[200px]"
                            />
                        </div>
                    </form>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="w-[50%]">
                                    Message
                                </TableHead>
                                <TableHead>Submitted At</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {wishes.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No wishes found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                wishes.data.map((wish) => (
                                    <TableRow key={wish.id}>
                                        <TableCell className="font-medium">
                                            {wish.name}
                                        </TableCell>
                                        <TableCell className="max-w-[400px]">
                                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                                {wish.message}
                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            {format(
                                                new Date(wish.created_at),
                                                "dd MMM yyyy HH:mm"
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DeleteButton wish={wish} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    <div className="mt-4">
                        <Pagination links={wishes.links} />
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}

function DeleteButton({ wish }: { wish: Wish }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (
            !confirm(
                `Are you sure you want to delete this wish from "${wish.name}"?`
            )
        ) {
            return;
        }

        setIsDeleting(true);
        router.delete(route("admin.wishes.destroy", wish.id), {
            onFinish: () => setIsDeleting(false),
        });
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete"
        >
            {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Trash className="h-4 w-4 text-red-500" />
            )}
        </Button>
    );
}
