import http from '@debens/http';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HankoAdminService {
    async getUserByEmail(email: string): Promise<any> {
        const { data } = await http.client.get<any>(`http://localhost:8001/users?email=${email}`);

        return data[0];
    }

    async getUserById(id: string): Promise<any> {
        const { data } = await http.client.get<any>(`http://localhost:8001/users?user_id=${id}`);

        return data[0];
    }
}
