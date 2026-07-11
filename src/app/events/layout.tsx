import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming Events | Farm Stay & Glamping",
  description: "Join us for exciting events, nature retreats, and special gatherings at Woodside Serene Jawadhu Hills.",
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
