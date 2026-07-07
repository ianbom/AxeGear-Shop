import { Link, router } from '@inertiajs/react';
import { Bell, Check, Heart, Package, Star, Tag, Truck } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import {
    markAllAsRead as markAllAsReadRoute,
    markAsRead as markAsReadRoute,
} from '@/actions/App/Http/Controllers/Customer/NotificationController';
import ProfileLayout from '@/layouts/profile-layout';
type NotificationItem = {
    id: number;
    type: string;
    title: string;
    message: string;
    time: string;
    is_read: boolean;
};
type Props = {
    notifications: {
        data: NotificationItem[];
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
    };
};
const notificationTypeConfig: Record<
    string,
    { icon: React.ComponentType<any>; color: string }
> = {
    order: { icon: Package, color: 'bg-emerald-100 text-emerald-600' },
    payment: { icon: Check, color: 'bg-emerald-100 text-emerald-600' },
    promo: { icon: Tag, color: 'bg-orange-100 text-orange-600' },
    shipping: { icon: Truck, color: 'bg-blue-100 text-blue-600' },
    system: { icon: Star, color: 'bg-surface-soft text-primary' },
    wishlist: { icon: Heart, color: 'bg-primary-soft text-primary' },
};
export default function ListNotification({ notifications }: Props) {
    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
    const items = useMemo(
        () =>
            notifications.data.map((notification) => ({
                ...notification,
                isRead: notification.is_read,
                ...(notificationTypeConfig[notification.type] ?? {
                    icon: Bell,
                    color: 'bg-surface-soft text-primary',
                }),
            })),
        [notifications.data],
    );
    const unreadCount = items.filter((n) => !n.isRead).length;
    const filteredNotifications = items.filter((n) => {
        if (activeTab === 'unread') {
            return !n.isRead;
        }
        return true;
    });
    const markAllAsRead = () => {
        router.post(
            markAllAsReadRoute.url(),
            {},
            { preserveScroll: true, preserveState: true },
        );
    };
    const markAsRead = (id: number) => {
        const target = items.find((notification) => notification.id === id);
        if (!target || target.isRead) {
            return;
        }
        router.post(
            markAsReadRoute.url(id),
            {},
            { preserveScroll: true, preserveState: true },
        );
    };
    return (
        <ProfileLayout
            title="Notifications"
            pageTitle="Notifications"
            subtitle="Stay updated with your orders and exclusive offers."
            activePath="notifications"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: 'My Account', href: '/my-profile' },
                { label: 'Notifications' },
            ]}
        >
            {' '}
            <div
                className="animate-fade-in-up mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
                style={{ animationDelay: '100ms' }}
            >
                {' '}
                <div className="flex w-fit space-x-2 rounded-[6px] border border-hairline-strong bg-white p-1">
                    {' '}
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`rounded-md px-4 py-2 text-[13px] font-medium transition-all ${activeTab === 'all' ? 'bg-surface-soft text-ink' : 'text-muted-foreground hover:text-ink'}`}
                    >
                        {' '}
                        All{' '}
                    </button>{' '}
                    <button
                        onClick={() => setActiveTab('unread')}
                        className={`flex items-center rounded-md px-4 py-2 text-[13px] font-medium transition-all ${activeTab === 'unread' ? 'bg-surface-soft text-ink' : 'text-muted-foreground hover:text-ink'}`}
                    >
                        {' '}
                        Unread{' '}
                        {unreadCount > 0 && (
                            <span className="ml-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                {' '}
                                {unreadCount}{' '}
                            </span>
                        )}{' '}
                    </button>{' '}
                </div>{' '}
                {unreadCount > 0 && (
                    <button
                        onClick={markAllAsRead}
                        className="flex items-center text-[12px] font-semibold text-ink transition-colors hover:text-primary"
                    >
                        {' '}
                        <Check size={14} className="mr-1.5" /> Mark all as
                        read{' '}
                    </button>
                )}{' '}
            </div>{' '}
            {/* --- Empty State --- */}{' '}
            {filteredNotifications.length === 0 ? (
                <div
                    className="animate-fade-in-up flex flex-col items-center justify-center rounded-[8px] border border-hairline-strong bg-white px-6 py-20 text-center"
                    style={{ animationDelay: '150ms' }}
                >
                    {' '}
                    <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
                        {' '}
                        <div className="absolute inset-0 rounded-full bg-surface-soft opacity-60 blur-xl"></div>{' '}
                        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-hairline-strong bg-white">
                            {' '}
                            <Bell
                                size={28}
                                className="text-muted-foreground"
                            />{' '}
                        </div>{' '}
                    </div>{' '}
                    <h2 className="mb-2 text-xl text-ink">
                        {' '}
                        No notifications yet{' '}
                    </h2>{' '}
                    <p className="mb-8 max-w-[280px] text-[13px] text-muted-foreground">
                        {' '}
                        {activeTab === 'unread'
                            ? "You've read all your notifications."
                            : "When you get updates on your orders or exclusive offers, they'll show up here."}{' '}
                    </p>{' '}
                    <Link href="/">
                        {' '}
                        <button className="rounded-[6px] bg-primary px-8 py-3 text-[12px] font-bold tracking-wider text-white transition-all hover:bg-[#E67312] active:scale-[0.98]">
                            {' '}
                            Continue Shopping{' '}
                        </button>{' '}
                    </Link>{' '}
                </div>
            ) : (
                /* --- Notification List --- */ <div
                    className="animate-fade-in-up overflow-hidden rounded-[8px] border border-hairline-strong bg-white"
                    style={{ animationDelay: '150ms' }}
                >
                    {' '}
                    <div className="divide-y divide-hairline-strong">
                        {' '}
                        {filteredNotifications.map((notification) => {
                            const IconComponent = notification.icon;
                            return (
                                <button
                                    key={notification.id}
                                    type="button"
                                    onClick={() => markAsRead(notification.id)}
                                    className={`group relative flex w-full items-start gap-4 p-5 text-left transition-all duration-300 hover:bg-white md:p-6 ${!notification.isRead ? 'bg-white/50' : 'bg-white'}`}
                                >
                                    {' '}
                                    {/* Unread indicator line */}{' '}
                                    {!notification.isRead && (
                                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-primary"></div>
                                    )}{' '}
                                    <div
                                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full md:h-12 md:w-12 ${notification.color}`}
                                    >
                                        {' '}
                                        <IconComponent
                                            size={20}
                                            className="md:h-6 md:w-6"
                                        />{' '}
                                    </div>{' '}
                                    <div className="min-w-0 flex-1 pr-4">
                                        {' '}
                                        <div className="mb-1 flex flex-col sm:flex-row sm:items-start sm:justify-between">
                                            {' '}
                                            <h3
                                                className={`truncate text-[14px] font-bold md:text-[15px] ${!notification.isRead ? 'text-ink' : 'text-muted-foreground'}`}
                                            >
                                                {' '}
                                                {notification.title}{' '}
                                            </h3>{' '}
                                            <span className="mt-1 flex-shrink-0 text-[11px] whitespace-nowrap text-muted-foreground sm:mt-0">
                                                {' '}
                                                {notification.time}{' '}
                                            </span>{' '}
                                        </div>{' '}
                                        <p
                                            className={`text-[12px] leading-relaxed md:text-[13px] ${!notification.isRead ? 'font-medium text-muted-foreground' : 'text-muted-foreground'}`}
                                        >
                                            {' '}
                                            {notification.message}{' '}
                                        </p>{' '}
                                    </div>{' '}
                                    {!notification.isRead && (
                                        <div className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                                    )}{' '}
                                </button>
                            );
                        })}{' '}
                    </div>{' '}
                </div>
            )}{' '}
        </ProfileLayout>
    );
}
