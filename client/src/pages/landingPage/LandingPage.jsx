import { Navigate } from "react-router-dom";

export default function TrackStackLandingPage() {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }
    
    return (
        <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">

            <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-900">
                <div className="absolute inset-0 bg-linear-to-b from-blue-500/10 via-transparent to-transparent" />

                <div className="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:justify-between lg:px-8">
                    <div className="max-w-3xl">
                        <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-400">
                            Modern Uptime Monitoring Platform
                        </div>

                        <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
                            Monitor Your Websites & APIs In Real Time
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
                            TrackStack helps developers monitor uptime, response times,
                            incidents, and service health with beautiful dashboards,
                            automated monitoring, and operational insights.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <a
                                href="/register"
                                className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                            >
                                Start Monitoring
                            </a>

                            <a
                                href="/login"
                                className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-6 py-3 text-sm font-semibold transition hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-900"
                            >
                                Live Dashboard
                            </a>
                        </div>

                        <div className="mt-12 flex flex-wrap items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Real-Time
                                </p>
                                <p>Incident Detection</p>
                            </div>

                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    24/7
                                </p>
                                <p>Background Monitoring</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 w-full max-w-2xl lg:mt-0">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-900 dark:bg-gray-950">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Production Dashboard
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Real-time operational monitoring
                                    </p>
                                </div>

                                <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                                    All Systems Operational
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {[
                                    {
                                        label: 'Uptime',
                                        value: '80.98%',
                                    },
                                    {
                                        label: 'Active Monitors',
                                        value: '18',
                                    },
                                    {
                                        label: 'Incidents Today',
                                        value: '3',
                                    },
                                    {
                                        label: 'Avg Response',
                                        value: '682ms',
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-black"
                                    >
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {item.label}
                                        </p>

                                        <p className="mt-2 text-3xl font-bold">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-black">
                                <div className="mb-4 flex items-center justify-between">
                                    <p className="font-medium">Recent Incident</p>

                                    <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-400">
                                        Resolved
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-800" />
                                    <div className="h-3 w-5/6 rounded-full bg-gray-200 dark:bg-gray-800" />
                                    <div className="h-3 w-2/3 rounded-full bg-gray-200 dark:bg-gray-800" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight">
                        Everything You Need To Monitor Production Systems
                    </h2>

                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Built with modern infrastructure, operational dashboards,
                        incident tracking, and real-time analytics.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {[
                        {
                            title: 'Real-Time Monitoring',
                            description:
                                'Continuously monitor websites and APIs with automated health checks.',
                        },
                        {
                            title: 'Incident Tracking',
                            description:
                                'Automatically detect outages and track incident history.',
                        },
                        {
                            title: 'Operational Analytics',
                            description:
                                'Visualize uptime, response times, and monitoring statistics.',
                        },
                        {
                            title: 'Responsive Dashboard',
                            description:
                                'Modern SaaS-style dashboard optimized for all devices.',
                        },
                        {
                            title: 'Dark Mode',
                            description:
                                'Fully themed operational interface with smooth transitions.',
                        },
                        {
                            title: 'Background Workers',
                            description:
                                'Automated background monitoring powered by Redis workers.',
                        },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-3xl border border-gray-200 bg-gray-50 p-8 transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-900 dark:bg-gray-950"
                        >
                            <h3 className="text-xl font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-y border-gray-200 bg-gray-50 dark:border-gray-900 dark:bg-gray-950">
                <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl font-bold">
                            Built With Modern Full-Stack Technologies
                        </h2>

                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            TrackStack combines modern frontend engineering, backend APIs,
                            cloud infrastructure, Redis workers, and operational analytics.
                        </p>
                    </div>

                    <div className="mt-12 flex flex-wrap gap-4">
                        {[
                            'React',
                            'Redux Toolkit',
                            'Tailwind CSS',
                            'Node.js',
                            'Express.js',
                            'MongoDB Atlas',
                            'Redis Cloud',
                            'Render',
                            'Vercel',
                            'Recharts',
                        ].map((tech) => (
                            <div
                                key={tech}
                                className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium shadow-sm dark:border-gray-800 dark:bg-black"
                            >
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8">
                <h2 className="text-5xl font-bold tracking-tight">
                    Start Monitoring Your Infrastructure Today
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
                    Track uptime, detect incidents, and gain operational insights with a
                    modern monitoring platform.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        href="/register"
                        className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                        Get Started Free
                    </a>

                    <a
                        href="/login"
                        className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-6 py-3 text-sm font-semibold transition hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-900"
                    >
                        Explore Dashboard
                    </a>
                </div>
            </section>
            <footer
                className="
    border-t border-gray-200
    bg-white px-6 py-6
    text-center text-sm
    text-gray-500
    dark:border-gray-800
    dark:bg-black
    dark:text-gray-400
  "
            >
                © {new Date().getFullYear()} TrackStack. Built by{" "}

                <span className="font-medium text-gray-700 dark:text-gray-300">
                    Aditya Kumar
                </span>

                . All rights reserved.
            </footer>
        </div>
    );
}
