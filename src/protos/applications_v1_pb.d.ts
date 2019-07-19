// package: applications_v1
// file: applications_v1.proto

import * as jspb from "google-protobuf";

export class ErrorDescription extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getCategory(): string;
  setCategory(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getCause(): string;
  setCause(value: string): void;

  getStackTrace(): string;
  setStackTrace(value: string): void;

  getDetailsMap(): jspb.Map<string, string>;
  clearDetailsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorDescription.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorDescription): ErrorDescription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorDescription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorDescription;
  static deserializeBinaryFromReader(message: ErrorDescription, reader: jspb.BinaryReader): ErrorDescription;
}

export namespace ErrorDescription {
  export type AsObject = {
    type: string,
    category: string,
    code: string,
    correlationId: string,
    status: string,
    message: string,
    cause: string,
    stackTrace: string,
    detailsMap: Array<[string, string]>,
  }
}

export class PagingParams extends jspb.Message {
  getSkip(): number;
  setSkip(value: number): void;

  getTake(): number;
  setTake(value: number): void;

  getTotal(): boolean;
  setTotal(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PagingParams.AsObject;
  static toObject(includeInstance: boolean, msg: PagingParams): PagingParams.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PagingParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PagingParams;
  static deserializeBinaryFromReader(message: PagingParams, reader: jspb.BinaryReader): PagingParams;
}

export namespace PagingParams {
  export type AsObject = {
    skip: number,
    take: number,
    total: boolean,
  }
}

export class Application extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getNameMap(): jspb.Map<string, string>;
  clearNameMap(): void;
  getDescriptionMap(): jspb.Map<string, string>;
  clearDescriptionMap(): void;
  getProduct(): string;
  setProduct(value: string): void;

  getGroup(): string;
  setGroup(value: string): void;

  getCopyrights(): string;
  setCopyrights(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  getIcon(): string;
  setIcon(value: string): void;

  getMinVer(): number;
  setMinVer(value: number): void;

  getMaxVer(): number;
  setMaxVer(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Application.AsObject;
  static toObject(includeInstance: boolean, msg: Application): Application.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Application, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Application;
  static deserializeBinaryFromReader(message: Application, reader: jspb.BinaryReader): Application;
}

export namespace Application {
  export type AsObject = {
    id: string,
    nameMap: Array<[string, string]>,
    descriptionMap: Array<[string, string]>,
    product: string,
    group: string,
    copyrights: string,
    url: string,
    icon: string,
    minVer: number,
    maxVer: number,
  }
}

export class ApplicationPage extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  clearDataList(): void;
  getDataList(): Array<Application>;
  setDataList(value: Array<Application>): void;
  addData(value?: Application, index?: number): Application;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ApplicationPage.AsObject;
  static toObject(includeInstance: boolean, msg: ApplicationPage): ApplicationPage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ApplicationPage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ApplicationPage;
  static deserializeBinaryFromReader(message: ApplicationPage, reader: jspb.BinaryReader): ApplicationPage;
}

export namespace ApplicationPage {
  export type AsObject = {
    total: number,
    dataList: Array<Application.AsObject>,
  }
}

export class ApplicationPageRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getFilterMap(): jspb.Map<string, string>;
  clearFilterMap(): void;
  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): PagingParams | undefined;
  setPaging(value?: PagingParams): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ApplicationPageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ApplicationPageRequest): ApplicationPageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ApplicationPageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ApplicationPageRequest;
  static deserializeBinaryFromReader(message: ApplicationPageRequest, reader: jspb.BinaryReader): ApplicationPageRequest;
}

export namespace ApplicationPageRequest {
  export type AsObject = {
    correlationId: string,
    filterMap: Array<[string, string]>,
    paging?: PagingParams.AsObject,
  }
}

export class ApplicationPageReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasPage(): boolean;
  clearPage(): void;
  getPage(): ApplicationPage | undefined;
  setPage(value?: ApplicationPage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ApplicationPageReply.AsObject;
  static toObject(includeInstance: boolean, msg: ApplicationPageReply): ApplicationPageReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ApplicationPageReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ApplicationPageReply;
  static deserializeBinaryFromReader(message: ApplicationPageReply, reader: jspb.BinaryReader): ApplicationPageReply;
}

export namespace ApplicationPageReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    page?: ApplicationPage.AsObject,
  }
}

export class ApplicationIdRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getApplicationId(): string;
  setApplicationId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ApplicationIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ApplicationIdRequest): ApplicationIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ApplicationIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ApplicationIdRequest;
  static deserializeBinaryFromReader(message: ApplicationIdRequest, reader: jspb.BinaryReader): ApplicationIdRequest;
}

export namespace ApplicationIdRequest {
  export type AsObject = {
    correlationId: string,
    applicationId: string,
  }
}

export class ApplicationObjectRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  hasApplication(): boolean;
  clearApplication(): void;
  getApplication(): Application | undefined;
  setApplication(value?: Application): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ApplicationObjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ApplicationObjectRequest): ApplicationObjectRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ApplicationObjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ApplicationObjectRequest;
  static deserializeBinaryFromReader(message: ApplicationObjectRequest, reader: jspb.BinaryReader): ApplicationObjectRequest;
}

export namespace ApplicationObjectRequest {
  export type AsObject = {
    correlationId: string,
    application?: Application.AsObject,
  }
}

export class ApplicationObjectReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasApplication(): boolean;
  clearApplication(): void;
  getApplication(): Application | undefined;
  setApplication(value?: Application): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ApplicationObjectReply.AsObject;
  static toObject(includeInstance: boolean, msg: ApplicationObjectReply): ApplicationObjectReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ApplicationObjectReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ApplicationObjectReply;
  static deserializeBinaryFromReader(message: ApplicationObjectReply, reader: jspb.BinaryReader): ApplicationObjectReply;
}

export namespace ApplicationObjectReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    application?: Application.AsObject,
  }
}

