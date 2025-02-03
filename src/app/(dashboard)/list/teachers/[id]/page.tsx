import Image from "next/image";
import Link from "next/link";
import { role } from "@/mock/data";
import {
  Announcements,
  BigCalendar,
  FormModal,
  PerformanceChart,
} from "@/components";

export default function ListTeachersById() {
  return (
    <div className="flex flex-1 flex-col p-4 gap-4 xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex gap-4 flex-1 py-6 px-4 rounded-md bg-sky">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Teacher"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Leonard Snyder</h1>
                {role === "admin" && (
                  <FormModal
                    table="teacher"
                    type="update"
                    data={{
                      id: 1,
                      username: "deanguerrero",
                      email: "deanguerrero@gmail.com",
                      password: "password",
                      firstName: "Dean",
                      lastName: "Guerrero",
                      phone: "+1 234 567 89",
                      address: "1234 Main St, Anytown, USA",
                      bloodType: "A+",
                      dateOfBirth: "2000-01-01",
                      sex: "male",
                      img: "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
                    }}
                  />
                )}
              </div>
              <p className="text-sm text-gray-500">Loremp Ipsum color ips</p>
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/blood.png"
                    alt="Teacher's blood type"
                    width={14}
                    height={14}
                  />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/date.png"
                    alt="Teacher's birthday"
                    width={14}
                    height={14}
                  />
                  <span>January 2001</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/mail.png"
                    alt="Teacher's mail"
                    width={14}
                    height={14}
                  />
                  <span>user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image
                    src="/phone.png"
                    alt="Teacher's phone"
                    width={14}
                    height={14}
                  />
                  <span>+123456789</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap flex-1 justify-between gap-4">
            <div className="flex gap-4 w-full md:w-[48%] lg:w-[47%] p-4 rounded-md bg-red">
              <Image
                src="/singleAttendance.png"
                alt="Attendance"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h2 className="text-xl font-semibold">90%</h2>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-[48%] lg:w-[47%] p-4 rounded-md bg-white">
              <Image
                src="/singleBranch.png"
                alt="Branches"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h2 className="text-xl font-semibold">2</h2>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-[48%] lg:w-[47%] p-4 rounded-md bg-white">
              <Image
                src="/singleLesson.png"
                alt="Attendance"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h2 className="text-xl font-semibold">6</h2>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-[48%] lg:w-[47%] p-4 rounded-md bg-white">
              <Image
                src="/singleClass.png"
                alt="Attendance"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div>
                <h2 className="text-xl font-semibold">4</h2>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-md p-4 h-[800px] bg-white">
          <h1>Teacher&apos;s schedule</h1>
          <BigCalendar />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full xl:w-1/3">
        <div className="p-4 rounded-md bg-white">
          <h2 className="text-xl font-semibold">Shortcuts</h2>
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
            <Link href="/" className="p-3 rounded-md bg-skyLight">
              Teacher&apos;s classes
            </Link>
            <Link href="/" className="p-3 rounded-md bg-purpleLight">
              Teacher&apos;s students
            </Link>
            <Link href="/" className="p-3 rounded-md bg-yellowLight">
              Teacher&apos;s lessons
            </Link>
            <Link href="/" className="p-3 rounded-md bg-purpleLight">
              Teacher&apos;s exams
            </Link>
            <Link href="/" className="p-3 rounded-md bg-skyLight">
              Teacher&apos;s assignments
            </Link>
          </div>
        </div>
        <PerformanceChart />
        <Announcements />
      </div>
    </div>
  );
}
