import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import React from 'react';

function Index({ auth, users }) {
    const HandleChangeRole = (id) => {
        Inertia.put(route('users.update', id));
    }
    return (
        <Authenticated user={auth.user}>
            <Head title="Users" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map(user => (
                                        <tr key={user.id} className={user.email === auth.user.email ? 'bg-gray-100' : ''}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.is_admin ? 'Admin' : 'Pending'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.email !== auth.user.email && (
                                                    <>
                                                        {user.is_admin ? (
                                                            <button 
                                                                className="text-red-600 hover:text-red-900"
                                                                onClick={() => {HandleChangeRole(user.id)}}>
                                                                Demote
                                                            </button>
                                                        ) : (
                                                            <button 
                                                                className="text-green-600 hover:text-green-900"
                                                                onClick={() => {HandleChangeRole(user.id)}}>
                                                                Promote
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

export default Index;
