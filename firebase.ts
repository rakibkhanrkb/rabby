
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  getCountFromServer
} from "firebase/firestore";
import { Appointment } from './types';

/**
 * Firebase Configuration
 */
const firebaseConfig = {
  apiKey: "AIzaSyAs-Placeholder-Key-Change-This", 
  authDomain: "rabby-41829.firebaseapp.com",
  projectId: "rabby-41829",
  storageBucket: "rabby-41829.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export class FirebaseService {
  private appointmentsCol = collection(db, "appointments");

  async addAppointment(patient: Omit<Appointment, 'id' | 'serialNumber' | 'timestamp' | 'status'>): Promise<Appointment> {
    try {
      const dailyQuery = query(this.appointmentsCol, where("date", "==", patient.date));
      const snapshot = await getCountFromServer(dailyQuery);
      const nextSerial = snapshot.data().count + 1;

      const appointmentData = {
        ...patient,
        serialNumber: nextSerial,
        timestamp: serverTimestamp(),
        status: 'pending' as const
      };

      const docRef = await addDoc(this.appointmentsCol, appointmentData);
      
      return {
        ...appointmentData,
        id: docRef.id,
        timestamp: new Date().toISOString()
      } as Appointment;
    } catch (error) {
      console.error("Error adding appointment: ", error);
      throw error;
    }
  }

  async getAllAppointments(): Promise<Appointment[]> {
    try {
      const q = query(this.appointmentsCol, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toISOString() : data.timestamp
        };
      }) as Appointment[];
    } catch (error) {
      console.error("Error getting appointments: ", error);
      return [];
    }
  }

  async getAppointmentById(id: string): Promise<Appointment | undefined> {
    try {
      const docRef = doc(db, "appointments", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toISOString() : data.timestamp
        } as Appointment;
      }
      return undefined;
    } catch (error) {
      console.error("Error getting appointment: ", error);
      return undefined;
    }
  }

  async getAppointmentsByPhone(phone: string): Promise<Appointment[]> {
    try {
      // To avoid 'The query requires an index' error, we remove the orderBy from the server-side query
      // and perform the sorting on the client side instead.
      const q = query(this.appointmentsCol, where("phone", "==", phone));
      const querySnapshot = await getDocs(q);
      
      const results = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toISOString() : data.timestamp
        };
      }) as Appointment[];

      // Sort by timestamp descending in-memory
      return results.sort((a, b) => {
        const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
        const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
        return timeB - timeA;
      });
    } catch (error) {
      console.error("Error searching by phone: ", error);
      return [];
    }
  }
}

export const dbService = new FirebaseService();
