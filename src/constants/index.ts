export const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

export const teacherShortcuts = [
  {
    name: "Teacher's classes",
    href: "/list/classes?supervisorId=teacher2",
    bgColor: "bg-skyLight",
  },
  {
    name: "Teacher's students",
    href: "/list/students?teacherId=teacher2",
    bgColor: "bg-yellowLight",
  },
  {
    name: "Teacher's lessons",
    href: "/list/lessons?teacherId=teacher2",
    bgColor: "bg-purpleLight",
  },
  {
    name: "Teacher's exams",
    href: "/list/exams?teacherId=teacher2",
    bgColor: "bg-yellowLight",
  },
  {
    name: "Teacher's assignments",
    href: "/list/assignments?teacherId=teacher2",
    bgColor: "bg-skyLight",
  },
];

export const studentShortcuts = [
  {
    name: "Student's results",
    href: "/list/results?studentId=student2",
    bgColor: "bg-skyLight",
  },
  {
    name: "Student's teachers",
    href: "/list/teachers?classId=1",
    bgColor: "bg-yellowLight",
  },
  {
    name: "Student's lessons",
    href: "/list/lessons?classId=1",
    bgColor: "bg-purpleLight",
  },
  {
    name: "Student's exams",
    href: "/list/exams?classId=1",
    bgColor: "bg-yellowLight",
  },
  {
    name: "Student's assignments",
    href: "/list/assignments?classId=1",
    bgColor: "bg-skyLight",
  },
];

export const RECORDS_PER_PAGE = 10;
