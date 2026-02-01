import { Heart, LayoutDashboard, MessageCircle, UserCheck, Users } from 'lucide-react';
import * as React from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';

const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: route('admin.dashboard'),
            icon: LayoutDashboard,
        },
        {
            title: 'Guests',
            url: route('admin.guests.index'),
            icon: Users,
        },
        {
            title: 'RSVPs',
            url: route('admin.rsvps.index'),
            icon: UserCheck,
        },
        {
            title: 'Wishes',
            url: route('admin.wishes.index'),
            icon: MessageCircle,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { url } = usePage();

    return (
        <Sidebar {...props} collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('admin.dashboard')}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 text-white">
                                    <Heart className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Wedding Admin</span>
                                    <span className="text-xs text-muted-foreground">Marcell & Lisa</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {data.navMain.map((item) => {
                            const isActive = url.startsWith(new URL(item.url).pathname);
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                                        <Link href={item.url} className="font-medium">
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
