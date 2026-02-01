import AdminLayout from "@/layouts/admin-layout";
import { Head, router } from "@inertiajs/react";
import { Rsvp, Paginated, PageProps } from "@/types";
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import {
    CheckCircle,
    Loader2,
    Search,
    Trash,
    Users,
    XCircle,
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

interface Props extends PageProps {
    rsvps: Paginated<Rsvp>;
    stats: {
        total: number;
        attending: number;
        not_attending: number;
        total_pax: number;
    };
    filters: { search?: string; status?: string };
}

export default function RsvpsIndex({ rsvps, stats, filters }: Props) {
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route("admin.rsvps.index"),
            { search, status: filters.status },
            { preserveState: true }
        );
    };

    const handleStatusFilter = (status: string) => {
        router.get(
            route("admin.rsvps.index"),
            { search, status: status === "all" ? undefined : status },
            { preserveState: true }
        );
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    RSVP Management
                </h2>
            }
        >
            <Head title="RSVP Management" />

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total RSVPs
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Attending
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.attending}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Not Attending
                        </CardTitle>
                        <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {stats.not_attending}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Pax
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.total_pax}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            confirmed seats
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Table Card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>RSVPs</CardTitle>
                    <div className="flex items-center gap-2">
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center gap-2"
                        >
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-8 w-[200px]"
                                />
                            </div>
                        </form>
                        <Select
                            value={filters.status || "all"}
                            onValueChange={handleStatusFilter}
                        >
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Filter status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="attending">
                                    Attending
                                </SelectItem>
                                <SelectItem value="not_attending">
                                    Not Attending
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Linked Guest</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Pax</TableHead>
                                <TableHead>Submitted At</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rsvps.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No RSVPs found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                rsvps.data.map((rsvp) => (
                                    <TableRow key={rsvp.id}>
                                        <TableCell className="font-medium">
                                            {rsvp.name}
                                        </TableCell>
                                        <TableCell>
                                            {rsvp.guest?.name || (
                                                <span className="text-muted-foreground">
                                                    -
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {rsvp.status === "attending" ? (
                                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                                    Attending
                                                </Badge>
                                            ) : (
                                                <Badge variant="destructive">
                                                    Not Attending
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {rsvp.pax_confirmed}
                                        </TableCell>
                                        <TableCell>
                                            {format(
                                                new Date(rsvp.created_at),
                                                "dd MMM yyyy HH:mm"
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DeleteButton rsvp={rsvp} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    <div className="mt-4">
                        <Pagination links={rsvps.links} />
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}

function DeleteButton({ rsvp }: { rsvp: Rsvp }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (!confirm(`Are you sure you want to delete this RSVP from "${rsvp.name}"?`)) {
            return;
        }

        setIsDeleting(true);
        router.delete(route("admin.rsvps.destroy", rsvp.id), {
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
