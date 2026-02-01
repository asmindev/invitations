import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Invitation {
    id: number;
    slug: string;
    groom_name: string;
    bride_name: string;
    wedding_date: string;
    is_active: boolean;
    sections_count: number;
    created_at: string;
}

interface PaginatedInvitations {
    data: Invitation[];
    links: any;
    meta: any;
}

interface Props {
    invitations: PaginatedInvitations;
}

export default function Index({ invitations }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this invitation?')) {
            router.delete(route('admin.invitations.destroy', id));
        }
    };

    return (
        <>
            <Head title="Manage Invitations" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold text-gray-800">Wedding Invitations</h2>
                                <Link
                                    href={route('admin.invitations.create')}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                                >
                                    + Create New Invitation
                                </Link>
                            </div>

                            {/* Search */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search invitations..."
                                    className="w-full rounded-md border border-gray-300 px-4 py-2"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Couple</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Slug</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Wedding Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Sections
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {invitations.data.map((invitation) => (
                                            <tr key={invitation.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {invitation.groom_name} & {invitation.bride_name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">/{invitation.slug}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(invitation.wedding_date).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{invitation.sections_count} sections</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                                            invitation.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                        {invitation.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                    <Link
                                                        href={route('admin.invitations.edit', invitation.id)}
                                                        className="mr-4 text-blue-600 hover:text-blue-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route('invitation.show', invitation.slug)}
                                                        className="mr-4 text-green-600 hover:text-green-900"
                                                        target="_blank"
                                                    >
                                                        View
                                                    </Link>
                                                    <button onClick={() => handleDelete(invitation.id)} className="text-red-600 hover:text-red-900">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {invitations.data.length === 0 && (
                                <div className="py-12 text-center">
                                    <p className="text-gray-500">No invitations found. Create your first one!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
