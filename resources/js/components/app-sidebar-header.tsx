import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="relative flex h-16 shrink-0 items-center justify-center border-b border-ink/15 bg-canvas px-6 text-center text-ink transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="absolute left-6 md:left-4">
                <SidebarTrigger className="-ml-1 border border-ink/15 text-ink hover:bg-ink hover:text-white" />
            </div>
            <div className="flex min-w-0 items-center justify-center text-[15px] font-semibold tracking-[0.08em] uppercase md:text-[17px]">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
        </header>
    );
}
