import { Module} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { EventsGateway, EventsService } from './events.gateway';

@Module({
    providers: [EventsGateway, EventsService],  // add it to providers
    exports: [EventsService],  // and exports
})
export class EventsModule {}