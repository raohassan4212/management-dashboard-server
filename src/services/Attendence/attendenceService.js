const Attendance = require('../../models/Attendance/attendance');


const createAttendance = async (attendanceData) => {
    try {

        const newAttendance = await Attendance.create(attendanceData);
  
      
      return newAttendance;
    } catch (error) {
      
      throw new Error('Failed to create attendance: ' + error.message);
    }
  };
  
  
const getAllAttendances = async () => {
    const attendances = await Attendance.findAll();
    return attendances;
  };
  
  
const getAttendanceById = async (attendanceId) => {
   
    const attendance = await Attendance.findOne(attendanceId);
    return attendance;
  };
  

const updateAttendance = async (attendanceId, updatedData) => {

    const attendance = await Attendance.findOne(attendanceId);
  
    if (!attendance) {
      throw new Error('Attendance not found');
    }
  
    
    await attendance.update(updatedData);
  
    
    const updatedAttendance = await Attendance.findOne(attendanceId);
    
    return updatedAttendance;
  };
  

const deleteAttendance = async (attendanceId) => {

    const attendance = await Attendance.findOne(attendanceId);
  
    if (!attendance) {
      throw new Error('Attendance not found');
    }
  
    
    await attendance.destroy();
  
    return attendance; 
  };
  
  module.exports = { createAttendance, getAllAttendances, getAttendanceById, updateAttendance, deleteAttendance };
