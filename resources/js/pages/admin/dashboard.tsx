import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, UserCheck, Users, ArrowRight, ExternalLink } from 'lucide-react';

export default function Dashboard() {
    return (
        <AdminLayout header={<h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">Dashboard</h2>}>
            <Head title="Admin Dashboard" />

            {/* Welcome Section */}
            <Card className="border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl text-rose-700 dark:text-rose-300">
                        <Heart className="h-6 w-6" />
                        Welcome to Wedding Admin
                    </CardTitle>
                    <CardDescription className="text-rose-600/80 dark:text-rose-400/80">
                        Manage your wedding invitations, guest list, RSVPs, and wishes from one place.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild variant="default" className="bg-rose-500 hover:bg-rose-600">
                        <a href={route('invitation.index')} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Invitation Site
                        </a>
                    </Button>
                </CardContent>
            </Card>

            {/* Quick Links Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Guest Management</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground mb-4">
                            Add and manage your guest list, generate personalized invitation links.
                        </p>
                        <Button asChild variant="outline" size="sm">
                            <Link href={route('admin.guests.index')}>
                                Manage Guests
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">RSVP Responses</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground mb-4">
                            View and manage RSVP responses from your guests.
                        </p>
                        <Button asChild variant="outline" size="sm">
                            <Link href={route('admin.rsvps.index')}>
                                View RSVPs
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Wishes & Messages</CardTitle>
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground mb-4">
                            Read and moderate wishes and messages from your loved ones.
                        </p>
                        <Button asChild variant="outline" size="sm">
                            <Link href={route('admin.wishes.index')}>
                                View Wishes
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
