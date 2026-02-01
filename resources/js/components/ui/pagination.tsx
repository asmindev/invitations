import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { PaginationLink } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    links: PaginationLink[];
    className?: string;
}

export function Pagination({ links, className }: PaginationProps) {
    if (links.length <= 3) return null; // No pagination needed

    return (
        <nav className={`flex items-center justify-center gap-1 ${className}`}>
            {links.map((link, index) => {
                // Skip Previous and Next labels, we'll use icons
                const isFirst = index === 0;
                const isLast = index === links.length - 1;

                if (isFirst) {
                    return (
                        <Button
                            key="prev"
                            variant="outline"
                            size="icon"
                            disabled={!link.url}
                            asChild={!!link.url}
                        >
                            {link.url ? (
                                <Link href={link.url} preserveScroll>
                                    <ChevronLeft className="h-4 w-4" />
                                </Link>
                            ) : (
                                <span>
                                    <ChevronLeft className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    );
                }

                if (isLast) {
                    return (
                        <Button
                            key="next"
                            variant="outline"
                            size="icon"
                            disabled={!link.url}
                            asChild={!!link.url}
                        >
                            {link.url ? (
                                <Link href={link.url} preserveScroll>
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            ) : (
                                <span>
                                    <ChevronRight className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    );
                }

                // Regular page number
                return (
                    <Button
                        key={index}
                        variant={link.active ? "default" : "outline"}
                        size="icon"
                        disabled={!link.url}
                        asChild={!!link.url}
                    >
                        {link.url ? (
                            <Link
                                href={link.url}
                                preserveScroll
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        )}
                    </Button>
                );
            })}
        </nav>
    );
}
