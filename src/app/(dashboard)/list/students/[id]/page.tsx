import Image from "next/image";

export default function ListStudentsById() {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex gap-4 flex-1 py-6 px-4 rounded-md bg-sky">
        <div className="w-1/3">
          <Image
            src="https://images.pexels.com/photos/936126/pexels-photo-936126.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Student"
            width={144}
            height={144}
            className="w-36 h-36 rounded-full object-cover"
          />
        </div>
        <div className="w-2/3 flex flex-col justify-between gap-4">
          <h1 className="text-xl font-semibold">Student name</h1>
          <p className="text-sm text-gray-500">Loremp Ipsum color ips</p>
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-medium">
            <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
              <Image
                src="/blood.png"
                alt="Student's blood type"
                width={14}
                height={14}
              />
              <span>A+</span>
            </div>
            <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
              <Image
                src="/date.png"
                alt="Student's birthday"
                width={14}
                height={14}
              />
              <span>January 2001</span>
            </div>
            <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
              <Image
                src="/mail.png"
                alt="Student's mail"
                width={14}
                height={14}
              />
              <span>user@gmail.com</span>
            </div>
            <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
              <Image
                src="/phone.png"
                alt="Student's phone"
                width={14}
                height={14}
              />
              <span>+123456789</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap flex-1 justify-between gap-4">
        <div className="flex gap-4 w-full md:w-[48%] lg:w-[47%] p-4 rounded-md bg-white">
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
            <h2 className="text-xl font-semibold">6th</h2>
            <span className="text-sm text-gray-400">Grade</span>
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
            <h2 className="text-xl font-semibold">4A</h2>
            <span className="text-sm text-gray-400">Class</span>
          </div>
        </div>
      </div>
    </div>
  );
}
