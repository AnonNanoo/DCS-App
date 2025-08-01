import github_light from "/github-logo-light.svg";
import github_dark from "/github-logo-dark.svg";

const githubUsername = "AnonNanoo";
const githubUrl = `https://github.com/${githubUsername}`;
const githubAvatar = `https://github.com/${githubUsername}.png`;
const githubProjectUrl = "https://github.com/AnonNanoo/DCS-App";

export default function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground py-4">
            <div className="container mx-auto max-w-7xl px-8 flex items-center justify-between relative">
                
                <p className="absolute left-1/2 transform -translate-x-1/2 text-sm text-center">
                    &copy; {new Date().getFullYear()} DCS-App. All rights reserved.
                </p>

                <div className="flex items-center gap-4 ml-auto">
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:underline"
                    >
                        @{githubUsername}
                        <img
                            src={githubAvatar}
                            alt="GitHub Avatar"
                            className="w-8 h-8 rounded-full border border-gray-300"
                        />
                    </a>

                    <button
                        onClick={() => window.open(githubProjectUrl, '_blank')}
                        className="hover:cursor-pointer transition-transform hover:scale-110"
                    >
                        <img
                            className="hidden dark:block w-8 h-8"
                            src={github_dark}
                            alt="GitHub Repository"
                        />
                        <img
                            className="dark:hidden w-8 h-8"
                            src={github_light}
                            alt="GitHub Repository"
                        />
                    </button>
                </div>
            </div>
        </footer>
    );
}
